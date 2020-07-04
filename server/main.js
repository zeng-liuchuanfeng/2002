var createServers=require("./server");
var goods=require("./goods");
var commodity=require('./commodity');
var singnUp=require("./singnUp");
var singnIn=require("./singnIn");

var route={
    goods:goods,
    commodity:commodity,
    singnUp:singnUp,
    singnIn:singnIn,
}
createServers(route);