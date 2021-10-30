import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationModel } from '../common/models/pagination.model';
import { UapHttpService } from '../uap-http.service';
import { PackageDetailResponse } from './model/package-details.model';
import { CreateOrUpdatePackageResponse, PackageRequest } from './model/package-request.model';
import { PackageResponse } from './model/package-response.model';
import { TaskTemplateResponse } from './model/task-template-response.model';
import { LoadMorePackageTemplatesModel } from 'src/app/admin/assessments/redux/assessments.model';

@Injectable()
export class PackageAPIService {
  constructor(private httpClient: UapHttpService) {}
  getTasks(taskType?: string, pagination?: PaginationModel): Observable<TaskTemplateResponse> {
    return this.httpClient.get<TaskTemplateResponse>(`/tasks?type=${taskType}`);
  }

  getPackages(request: LoadMorePackageTemplatesModel): Observable<PackageResponse> {
    let endpoint = `/packages?offset=${request.pageMetaData.offset}&limit=${request.pageMetaData.limit}`;
    if (request.status) {
      endpoint = `${endpoint}&status=${request.status}`;
    }
    if (request.searchString) {
      endpoint = `${endpoint}&searchText=${request.searchString}`;
    }
    return this.httpClient.get<PackageResponse>(endpoint);
  }
  getMorePackageTemplates(request: LoadMorePackageTemplatesModel): Observable<PackageResponse> {
    let endpoint = `/packages?offset=${request.pageMetaData.nextOffset}&limit=${request.pageMetaData.limit}`;
    if (request.status) {
      endpoint = `${endpoint}&status=${request.status}`;
    }
    if (request.searchString) {
      endpoint = `${endpoint}&searchText=${request.searchString}`;
    }
    return this.httpClient.get<PackageResponse>(endpoint);
  }

  getPackage(id: string,orgId:string): Observable<PackageDetailResponse> {
    // console.log(id)
    return this.httpClient.get<PackageDetailResponse>(`/packages/${id}`);
  }
  createPackage(request: PackageRequest): Observable<CreateOrUpdatePackageResponse> {
    return this.httpClient.post<CreateOrUpdatePackageResponse>(`/packages`, request);
  }
  updatePackage(
    packageId: string | undefined,
    updateData: PackageRequest
  ): Observable<PackageRequest> {
    return this.httpClient.put<PackageRequest>(`/packages/${Number(packageId)}`, updateData);
  }
  patchPackage(
    packageId: string | undefined,
    patchAssessmentPackageStatus: PackageRequest
  ): Observable<PackageRequest> {
    return this.httpClient.patch<PackageRequest>(
      `/packages/${Number(packageId)}`,
      patchAssessmentPackageStatus
    );
  }
  deletePackage(packageId: number): Observable<object> {
    return this.httpClient.delete(`/packages/${packageId}`);
  }
}
