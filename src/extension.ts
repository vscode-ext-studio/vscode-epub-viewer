import * as vscode from 'vscode';
import { EpubViewerProvider } from './epubViewerProvider';

export function activate(context: vscode.ExtensionContext) {

console.log('active')
	const option = { webviewOptions: { retainContextWhenHidden: true, enableFindWidget: true } };
	vscode.window.registerCustomEditorProvider("cweijan.epubViewer", new EpubViewerProvider(context), option);

}

export function deactivate() { }
