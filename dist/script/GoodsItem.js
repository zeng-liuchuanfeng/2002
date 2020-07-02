import Utils from "./Utils.js";
export default class GoodsItem{
    elem;
    constructor(data){
        this.elem=this.createElem(data);
    }
    appendTo(parent){
        if(typeof parent ==="string"){
            parent=document.querySelector(parent);
        }
        parent.appendChild(this.elem);
    }
    createElem(data){
        var div=Utils.ce("div");
        div.className="goodsCom";
        var a=Utils.ce("a");
        a.href=`./details.html?id=${data.id}`;
        a.target="_blank";
        div.appendChild(a);
        this.createIcon(a,data.icon);
        this.createTitle(a,data.title);
        this.createPriceCon(div,data);
        return div;
    }
    createIcon(parent,iconPath){
        var img=new Image();
        img.src=`../imgs/${iconPath}`;
        img.className="icon";
        parent.appendChild(img);
    }
    createTitle(parent,title){
        var p=Utils.ce("p");
        p.className="title";
        p.textContent=title;
        parent.appendChild(p);
    }
    createPriceCon(parent,data){
        var div=Utils.ce("div");
        div.className="priceCon";
        this.createPrice(div,data.price,data.oldPrice);
        this.createsold(div,data.sold);
        this.createButtom(div,data.id);
        parent.appendChild(div);
    }
    createPrice(parent,price,oldPrice){
        var priceDiv=Utils.ce("span");
        priceDiv.textContent="￥"+price;
        priceDiv.className="price";
        var oldPriceDiv=Utils.ce("span");
        oldPriceDiv.textContent="￥"+oldPrice;
        oldPriceDiv.className="oldPrice";
        parent.appendChild(priceDiv);
        parent.appendChild(oldPriceDiv);
    }
    createsold(parent,sold){
        var div = Utils.ce("div");
        var soldSpan=Utils.ce("span");
        var soldRed=Utils.ce("span");
        soldSpan.className = "soldSpan";
        soldRed.style.width = 200 * sold + "px";
        soldSpan.appendChild(soldRed);
        div.appendChild(soldSpan);
        parent.appendChild(div);

        var soldText = Utils.ce("span");
        soldText.textContent = Math.floor(sold * 100) +"%";
        soldText.className = "soldText";
        div.appendChild(soldText);
    }
    createButtom(parent,id){
        var a=Utils.ce("a");
        a.href=`./details.html?id=${id}`;
        a.textContent="马上抢";
        a.className="button"
        a.target="_blank";
        parent.appendChild(a);
    }
}