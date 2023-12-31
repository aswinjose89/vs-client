import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { TableRoutingModule } from "./tables-routing.module";

import { TablesKitchenSinkComponent } from "./kitchen-sink/kitchen-sink.component";
import { TablesKitchenSinkEditComponent } from "./kitchen-sink/edit/edit.component";
import { TablesRemoteDataComponent } from "./remote-data/remote-data.component";

const COMPONENTS = [TablesKitchenSinkComponent, TablesRemoteDataComponent];
const COMPONENTS_DYNAMIC = [TablesKitchenSinkEditComponent];

@NgModule({
  imports: [SharedModule, TableRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class TablesModule {}
