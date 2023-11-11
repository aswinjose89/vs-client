import { FormBuilder, FormControl, Validators } from "@angular/forms";

export class AnalyzerMixin {
  createForm(fb, analyzerColumns) {
    let temp = {};
    analyzerColumns.forEach((col) => {
      if (col.filter == true) {
        temp[col.columnDef] = col.required
          ? new FormControl(col.value || undefined, Validators.required)
          : new FormControl(col.value || undefined);
      }
    });
    return fb.group(temp);
  }
}
