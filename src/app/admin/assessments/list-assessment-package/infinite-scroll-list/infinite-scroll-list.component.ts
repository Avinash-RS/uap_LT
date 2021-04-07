import { Component, OnInit, Input } from '@angular/core';
import {
  AssesmentPackagesModel,
  MetaModel
} from 'src/app/rest-api/package-api/model/package-response.model';
import { Store } from '@ngrx/store';
import { AssessmentsReducerState } from '../../redux/assessments.model';
import { loadMorePackageTemplates } from '../../redux/assessments.actions';
@Component({
  selector: 'app-infinite-scroll-list',
  templateUrl: './infinite-scroll-list.component.html',
  styleUrls: ['./infinite-scroll-list.component.scss']
})
export class InfiniteScrollListComponent implements OnInit {
  @Input() packageTemplates: AssesmentPackagesModel[];
  @Input() pageMetadata: MetaModel;
  @Input() searchString: string;
  @Input() status: string;
  @Input() showLazyLoading: boolean;
  @Input() canViewPackage: boolean;
  constructor(private store: Store<AssessmentsReducerState>) {}
  ngOnInit(): void {}
  onScroll(): void {
    if (this.pageMetadata.nextOffset) {
      this.store.dispatch(
        loadMorePackageTemplates({
          payload: {
            pageMetaData: this.pageMetadata,
            searchString: this.searchString ? this.searchString : '',
            status: this.status ? this.status : ''
          }
        })
      );
    }
  }
}
