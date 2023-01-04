class model_class {
  /*
   * Set / get dispatch needs init in app root
   */
  dispatch = null;
  get_dispatch = () => {
    return this.dispatch == null ? false : this.dispatch;
  };
  set_dispatch = n_dispatch => {
    this.dispatch = n_dispatch;
  };
  /* End dispatch set */

  /*---- UPDATE LOCAL INFO ----*/
  resetAll = () => {
    this.dispatch({
      type: 'RESET_DATA',
    });
  };

  setStore = (label, data) => {
    this.dispatch({
      type: 'SET_STORE',
      payload: data,
      label,
    });
  };
}

export default new model_class();
