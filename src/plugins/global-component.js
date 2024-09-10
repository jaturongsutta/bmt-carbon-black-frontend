// Common Components
import nPagination from "@/components/common-components/n-pagination.vue";
import nBtn from "@/components/common-components/button/n-btn.vue";
import nGbtnView from "@/components/common-components/table-button/n-gbtn-view.vue";
import nGbtnEdit from "@/components/common-components/table-button/n-gbtn-edit.vue";
import NGbtnDelete from "@/components/common-components/table-button/n-gbtn-delete.vue";
import NGbtnDownload from "@/components/common-components/table-button/n-gbtn-download.vue";
import NGbtnExport from "@/components/common-components/table-button/n-gbtn-export.vue";
import NLoading from "@/components/common-components/n-loading.vue";
import NBtnAdd from "@/components/common-components/button/n-btn-add.vue";
import NBtnExport from "@/components/common-components/button/n-btn-export.vue";
import NBtnSave from "@/components/common-components/button/n-btn-save.vue";
import NBtnSaveAdd from "@/components/common-components/button/n-btn-save-add.vue";
import NBtnSaveUpdate from "@/components/common-components/button/n-btn-save-update.vue";
import NBtnCancel from "@/components/common-components/button/n-btn-cancel.vue";
import NBtnDoc from "@/components/common-components/button/n-btn-doc.vue";
import NBtnSearch from "@/components/common-components/button/n-btn-search.vue";
import NBtnReset from "@/components/common-components/button/n-btn-reset.vue";
import NBtnBack from "@/components/common-components/button/n-btn-back.vue";
import NBtnApprove from "@/components/common-components/button/n-btn-approve.vue";
import NBtnReject from "@/components/common-components/button/n-btn-reject.vue";
import NSelect from "@/components/common-components/n-select.vue";
import NDate from "@/components/common-components/n-date.vue";
import NTime from "@/components/common-components/n-time.vue";
import NBtnUpload from "@/components/common-components/button/n-btn-upload.vue";
import NInputNumber from "@/components/common-components/n-input-number.vue";
import NDatetime from "@/components/common-components/n-datetime.vue";

export function registerGlobalComponents(app) {
  app
    .component("n-btn", nBtn)
    .component("n-btn-add", NBtnAdd)
    .component("n-btn-export", NBtnExport)
    .component("n-btn-save", NBtnSave)
    .component("n-btn-save-add", NBtnSaveAdd)
    .component("n-btn-save-update", NBtnSaveUpdate)
    .component("n-btn-cancel", NBtnCancel)
    .component("n-btn-doc", NBtnDoc)
    .component("n-btn-search", NBtnSearch)
    .component("n-btn-reset", NBtnReset)
    .component("n-btn-upload", NBtnUpload)
    .component("n-btn-back", NBtnBack)
    .component("n-btn-approve", NBtnApprove)
    .component("n-btn-reject", NBtnReject)
    .component("n-gbtn-view", nGbtnView)
    .component("n-gbtn-edit", nGbtnEdit)
    .component("n-gbtn-delete", NGbtnDelete)
    .component("n-gbtn-download", NGbtnDownload)
    .component("n-gbtn-export", NGbtnExport)
    .component("n-select", NSelect)
    .component("n-input-number", NInputNumber)
    .component("n-date", NDate)
    .component("n-time", NTime)
    .component("n-datetime", NDatetime)
    .component("n-loading", NLoading)
    .component("n-pagination", nPagination);
}
