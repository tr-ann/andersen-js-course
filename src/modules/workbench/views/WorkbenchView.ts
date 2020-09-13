class WorkbenchView {
  drawWorkbench() {
    // отрисовка верстака
    const workbenchFragment = document.createDocumentFragment();
    const workbenchName = document.createElement('h3');
    workbenchName.textContent = 'Workbench';

    workbenchFragment.appendChild(workbenchName);

    document.body.appendChild(workbenchFragment);
  }
}

export let workbenchView = new WorkbenchView();
