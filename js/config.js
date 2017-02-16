/* Define API endpoints once globally */
$.fn.api.settings.api = {
  'createNewUser' : '/createNewUser',
  'login'         : '/login',
  'add user'      : '/add/{id}',
  'follow user'   : '/follow/{id}',
  'search'        : '/search/?query={value}'
};

export default $.fn.api.settings.api;
