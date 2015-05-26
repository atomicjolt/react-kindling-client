import Firebase from 'firebase';

const BaseUrl = 'https://blinding-torch-6091.firebaseio.com/';
const WebApi = {
  baseRef(){
    return new Firebase(settings.firebaseUrl);
  }
}

export default {BaseUrl, WebApi};
