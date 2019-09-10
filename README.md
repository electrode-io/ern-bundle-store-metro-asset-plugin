# Electrode Native bundle store metro asset plugin

To get an overview of the bundle store and its use, refer to the [Electrode Native bundle store documentation]

## Usage

This [metro asset plugin](https://facebook.github.io/metro/docs/en/configuration#assetplugins) is solely of use to Electrode Native [bundlestore upload] command. 

This command needs to be aware of the assets present in the application being bundled as it has to upload assets alongside the bundle to the bundle store server. Because Electrode Native is using metro for creating bundles, the only way to know which assets are present in the application being bundled is through metro. 

During bundling, the metro packager will relay metadata of all assets it process, to all registered metro asset plugins. This plugin does not transform assets. It only propagates the metadata of detected assets to Electrode Native through a local socket during [bundlestore upload] command execution. This way, the command is made aware of all assets locations and can package assets alongside bundle to be uploaded to the bundle store server.

[Electrode Native bundle store documentation]: https://native.electrode.io/cli-commands/bundlestore
[bundlestore upload]: https://native.electrode.io/cli-commands/bundlestore/upload
