import {HttpHeaders} from '@angular/common/http';

function getHeadersParams(params) {

  for (const param in params) {
    if (params[param] === null) {
      delete params[param];
    }
  }

  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params
  };
}

export {
  getHeadersParams
};
