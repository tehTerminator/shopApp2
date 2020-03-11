import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqlRequest } from '../interface/sql-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SqlService {
  // For Testing Purpose Only. Change to Another Link For Production.
  private serverUrl = 'http://192.168.0.10/api/sql_beta.php';

  constructor(private http: HttpClient) { }

  /**
   *
   * @param queryType Type of Query to Be Executed
   * @param theTable Name of Table on which Query Needs to Be Executed
   * @param request Additional Parameters for Query Generation
   */
  private createRequest(typeOfQuery: string, theTable: string, theRequest?: SqlRequest, verbose?: boolean ) {
    const request = {
      queryType: typeOfQuery,
      tableName: theTable,
      params: theRequest
    };

    if (verbose) {
      return this.http.post(this.serverUrl, request);
    } else {
      return this.http.post(this.serverUrl, request).pipe(map((response: any) => response.rows));
    }
  }

  select = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
    return this.createRequest('select', theTable, request, verbose);
  }
  insert = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
    return this.createRequest('insert', theTable, request, verbose);
  }
  update = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
    return this.createRequest('update', theTable, request, verbose);
  }
  delete = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
    return this.createRequest('delete', theTable, request, verbose);
  }
}
