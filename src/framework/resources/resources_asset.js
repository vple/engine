pc.extend(pc.resources, function () {
	var AssetResourceHandler = function (depot) {
		this._depot = depot;
	};
	AssetResourceHandler = AssetResourceHandler.extendsFrom(pc.resources.ResourceHandler);
	
	AssetResourceHandler.prototype.load = function (identifier, success, error, progress, options) {
		var guid = identifier;

		if(guid in pc.content.data) {
            success(pc.content.data[guid], options);
        } else {
            this._depot.assets.getOne(guid, function (asset) {
	            success(asset, options);
            }.bind(this));
        }		
	};
	
	AssetResourceHandler.prototype.open = function (data, options) {
		 return new pc.fw.Asset(data);
	};
	
	var AssetRequest = function AssetRequest(identifier) {
		
	};
	AssetRequest = AssetRequest.extendsFrom(pc.resources.ResourceRequest);
	AssetRequest.prototype.type = "asset";
	
	return {
		AssetRequest: AssetRequest,
		AssetResourceHandler: AssetResourceHandler
	};
}());
