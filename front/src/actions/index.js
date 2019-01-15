export const switchLoginModal = () => ({
  type: 'SWITCH_LOGIN_MODAL',
});

export const newProjectModal = () => ({
  type: 'NEW_PROJECT_MODAL',
});

export const newLayerModal = () => ({
  type: 'NEW_LAYER_MODAL',
});

export const showToggleAdd = () => ({
  type: 'SHOW_TOGGLE_ADD',
});

export const showToggleLog = () => ({
  type: 'SHOW_TOGGLE_LOG',
});

export const filterType = typeFilter => ({
  type: 'FILTER_TYPE',
  typeFilter,
});

export const hidAllModalNavBar = () => ({
  type: 'SWITCH_LOGIN_MODAL_HID',
});

export const selectActiveProject = projectId => ({
  type: 'SELECT_ACTIVE_PROJECT',
  projectId,
});
