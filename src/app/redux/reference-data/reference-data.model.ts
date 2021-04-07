import { ReferenceResponseModel } from 'src/app/rest-api/reference-api/models/reference-api.model';

export interface ReferenceState {
  reference: ReferenceResponseModel;
  categoryWithMenuOptions: CategoryWithMenuOptions;
}

export interface CategoryWithMenuOptions {
  data: Array<SelectMenuOption>;
}

export interface SelectMenuOption {
  name: string;
  menuOptions: Array<CodeDecodeOption>;
}

export interface CodeDecodeOption {
  code: string;
  decode: string;
}
