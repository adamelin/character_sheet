import {FormObjectModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";
import {BehaviorSubject} from "rxjs";
import {stripComments} from "tslint/lib/utils";
import {Observable} from "rxjs/Observable";
import {FormRepeatableElementModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";

/**
 * Created by matjazhi on 21.3.2017.
 */

export class TabService {
  private tabAnnotationName = "tab";
  private defaultTabAnnotationName = "defaultTab";
  private tabGroups$: BehaviorSubject<{ [pathId: string]: { [groupId: string]: TabGroup } }> = new BehaviorSubject({});

  constructor() {
  }

  isTab(model: FormObjectModel): boolean {
    return model.hasAnnotation(this.tabAnnotationName);
  }

  clearTabGroups(){
    this.tabGroups$.next({})
  }

  registerTabGroupsForModel(model: FormObjectModel) {
    if (!this.tabGroups$.getValue()[model.getPath()]) {
      let tabGroups: { [groupId: string]: TabGroup } = this. createTabGroupsUnderModel(model);
      if (tabGroups) {
        this.addToModelTabGroups(model, tabGroups);
      }
    }
  }

  private addToModelTabGroups(model: FormObjectModel, modelTabGroups: { [groupId: string]: TabGroup }) {
    if (modelTabGroups) {
      let newVal: { [pathId: string]: { [groupId: string]: TabGroup } } = {};
      let oldModelGroups: { [pathId: string]: { [groupId: string]: TabGroup } } = this.tabGroups$.getValue();
      let newModelPath = model.getPath();
      newVal[newModelPath] = modelTabGroups;
      this.tabGroups$.next(Object.assign(oldModelGroups, newVal));
    }
  }

  isInTabGroup(model: FormObjectModel): boolean {
    return !!this.getTabGroupForModel(model);
  }

  getTabGroupForModel$(model: FormObjectModel, tabGroups?: { [pathId: string]: { [groupId: string]: TabGroup } }): Observable<TabGroup> {
    return this.tabGroups$.map((tabGroups: { [pathId: string]: { [groupId: string]: TabGroup } }) => {
      let tabGroupForModel = this.getTabGroupForModel(model, tabGroups);

      if (tabGroupForModel) {
        return tabGroupForModel;
      }
      return null;
    });
  }

  getTabGroupForModel(model: FormObjectModel, tabGroups?: { [pathId: string]: { [groupId: string]: TabGroup } }): TabGroup {
    let parentModel: FormObjectModel = model.getParentModel() as FormObjectModel;
    if (!tabGroups) {
      tabGroups = this.tabGroups$.getValue();
    }
    let parentModelTabGroupsObj: { [tabGrId: string]: TabGroup } = parentModel && parentModel instanceof FormObjectModel ? tabGroups[parentModel.getPath()] : null;
    if (parentModelTabGroupsObj) {
      let inTabGroupId: string = Object.keys(parentModelTabGroupsObj).find((grId: string) => {
        let modelTab: TabObject = this.getTabObjectForModel(model, parentModelTabGroupsObj[grId]);
        return !!modelTab;
      });
      return inTabGroupId!=null ? parentModelTabGroupsObj[inTabGroupId] : null;
    }
  }

  selectTab(model: FormObjectModel, excludeParentTabs: boolean = false) {
    let parentModel: FormObjectModel = model.getParentModel() as FormObjectModel;
    if (this.isTab(model)) {
      let modelInTabGroup: TabGroup = this.getTabGroupForModel(model);
      if (modelInTabGroup && !(modelInTabGroup.selected && modelInTabGroup.selected.model === model)) {
        modelInTabGroup.selected = this.getTabObjectForModel(model, modelInTabGroup);

        let oldTabGroupsByPath: { [pathId: string]: { [groupId: string]: TabGroup } } = this.tabGroups$.getValue();
        this.addToModelTabGroups(parentModel, oldTabGroupsByPath[parentModel.getPath()]);
      }
    }
    if (!!parentModel && !excludeParentTabs) {
      this.selectTab(parentModel);
    }
  }

  updateTabVO(newTabVO: TabObject) {
    let forModel = newTabVO.model;
    let tabGroup: TabGroup = this.getTabGroupForModel(forModel);
    if (tabGroup) {
      let replaceAt: number = tabGroup.tabs.indexOf(this.getTabObjectForModel(forModel, tabGroup))
      if (replaceAt > -1) {
        tabGroup.tabs.splice(replaceAt, 1, newTabVO);
        let parentModel: FormObjectModel = forModel.getParentModel() as FormObjectModel;
        let oldTabGroupsByPath: { [pathId: string]: { [groupId: string]: TabGroup } } = this.tabGroups$.getValue();
        this.addToModelTabGroups(parentModel, oldTabGroupsByPath[parentModel.getPath()]);
      }
    }
  }

  isTabSelected$(model: FormObjectModel): Observable<boolean> {
    return this.tabGroups$.map((tabGroups: { [pathId: string]: { [groupId: string]: TabGroup } }) => {
      let tabGroupForModel = this.getTabGroupForModel(model, tabGroups);
      if (tabGroupForModel) {
        let selected = tabGroupForModel.selected;
        if (selected) {
          return selected.model === model;
        }
        return tabGroupForModel.tabs[0].model === model;
      }

      return false;
    });
  }

  getTabObjectForModel(model: FormObjectModel, tabGroup?: TabGroup):TabObject {
    if (!tabGroup) {
      tabGroup = this.getTabGroupForModel(model);
    }
    if(tabGroup){
      return tabGroup.tabs.find((tab: TabObject) => {
        return tab.model === model;
      });
    }

  }

  createTabGroupsUnderModel(model: FormObjectModel): { [groupId: string]: TabGroup } {
    let childModels: FormObjectModel[] = model.getChildModels() as FormObjectModel[];
    if (childModels && childModels.length) {
      let allTabs: TabObject[] = childModels
        .filter((chModel: FormObjectModel) => {
          return chModel.hasAnnotation(this.tabAnnotationName);
        })
        .map((tabModel) => {
          let isDefaultTab = tabModel.hasAnnotation(this.defaultTabAnnotationName);
          return {
            model: tabModel,
            pathId: tabModel.getPath(),
            tabGroupId: tabModel.annotationValue(this.tabAnnotationName),
            isDefault: isDefaultTab,
            isValid: true,
            isInvalidDirty: false
          };
        });

      if (allTabs.length) {
        let tabGroups: { [groupId: string]: TabGroup } = {};
        let selectedTabInGroup: { [groupId: string]: TabObject } = {};
        allTabs.forEach((tabObj) => {
          if (!tabGroups[tabObj.tabGroupId]) {
            tabGroups[tabObj.tabGroupId] = {id: tabObj.tabGroupId, tabs: [], selected: null};
          }
          if(tabObj.isDefault) {
            selectedTabInGroup[tabObj.tabGroupId] = tabObj;
          }
          tabGroups[tabObj.tabGroupId].tabs.push(tabObj);
        });
        Object.keys(selectedTabInGroup).forEach((tabGroupId: string) => {
          tabGroups[tabGroupId].selected = selectedTabInGroup[tabGroupId];
        });
        return tabGroups;
      }
    }
    return null;
  }
}

export interface TabGroup {
  id: string;
  tabs: TabObject[];
  selected: TabObject;
}

export interface TabObject {
  model: FormObjectModel;
  pathId: string;
  tabGroupId: string;
  isDefault: boolean;
  isValid: boolean;
  isInvalidDirty: boolean;
}
