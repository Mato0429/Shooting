/*

I don't have anything to write about, lol.
The license is in a file on github.
https://github.com/Mato0429/Shooting/blob/main/LICENSE

*/
try {
    window.addEventListener("DOMContentLoaded",main());
}
catch{
    debug.innerHTML("Running Error!!")
}

function main(){
    //画面関連
    const screen_w = 400;
    const screen_h = 600;

    //キャンバス
    const canvas = document.querySelector("#canvas");
    const con = canvas.getContext("2d");
    canvas.width = screen_w;
    canvas.height = screen_h;

    //フィールド
    let vcan = document.createElement("canvas");
    let vcon = vcan.getContext("2d");
    vcan.width = screen_w;
    vcan.height = screen_h;

    //星クラス作成
    class Star{
        constructor(){
            this.x = rand(0,screen_w);
            this.y = rand(0,screen_h);
            this.vx = 0;
            this.vy = rand(2,10);
            this.sz = rand(1,5);
        }
        //描画メソッド
        draw(){
            vcon.fillStyle = starcolor;
            vcon.fillRect(this.x,this.y,this.sz,this.sz);
        }
        //更新メソッド
        update(){
            //横スピード
            if (key[37]) this.vx = this.vy / 2;
            else if (key[39]) this.vx = this.vy / -2;
            else this.vx = 0;

            //移動
            this.x += this.vx;
            this.y += this.vy;
            
            //画面外に行ったときの処理
            if(this.y > screen_h){
                this.y = 0;
                this.x = rand(0,screen_w);
            }
            if(this.x > screen_w){
                this.x = 1;
            }
            if(this.x < 1){
                this.x = screen_w;
            }
        }
    }

    //playerクラス
    class Player{
        constructor(){
            this.speed = playerspeed;
            this.x = 150;
            this.y = 350;
        }
        draw(){
            drawsprite(this.x,this.y,sprite_player_img);
        }

        update(){
            //移動
            if (key[37])this.x -= this.speed;;
            if (key[38]) this.y -= this.speed;
            if (key[39]) this.x += this.speed;
            if (key[40]) this.y += this.speed;

            //場外判定
            if (this.x < -15) this.x = -15;
            if (this.x > 315) this.x = 315;
            if (this.y > 525) this.y = 525;
            if (this.y < -25) this.y = -25;
        }
    }

    //bulletクラス
    class Bullet{
        constructor(vx,vy){
            this.x = 9999;
            this.y = -9999;
            this.vx = vx;
            this.vy = vy;
        }
        draw(){
            drawsprite(this.x,this.y,sprite_bullet_img);
        }
        update(){
            if(key[32] && this.y < -25) {
                this.x = player.x + 20;
                this.y = player.y + 5;
            }
            this.x += this.vx;
            this.y -= this.vy;
        }
    }

    //ゲームループ
    function loop(){
        //更新
        for (let i = 0; i < starmax ; i ++) star[i].update();

        //描画
        vcon.fillStyle = "black";
        vcon.fillRect(0,0,screen_w,screen_h);

        for (let i = 0; i < starmax ; i ++) star[i].draw();

        //bullet更新
        for(let i = 0;i < bullet.length;i++) bullet[i].update();
        //bulletスプライト描画
        for(let i = 0;i < bullet.length;i++) bullet[i].draw();

        //player更新
        player.update();
        //playerスプライト描画
        player.draw();

        //雷描画
        if(rand(0,100) == 1) bolt = 12;

        if(bolt > 0){
        vcon.fillStyle = "rgba(255,255,255,0.50)";
        vcon.fillRect(0,0,screen_w,screen_h);
        bolt--;
        }

        //仮想画面からキャンバスにコピー
        con.drawImage(vcan,0,0,screen_w,screen_h,
            0,0,screen_w,screen_h);

    }

    //乱数生成
    function rand(max,min){
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    //キーボード入力取得
    let key = [];

    document.onkeydown = function(e){
        key[e.keyCode] = true;
    }

    document.onkeyup = function(e){
        key[e.keyCode] = false;
    }

    //ファイル読み込み
    const sprite_player_img = new Image();
    sprite_player_img.src = "img/mini idle.png";
    const sprite_bullet_img = new Image();
    sprite_bullet_img.src = "img/bigshot.png";

    //スプライトクラス
    class Sprite{
        constructor(x,y,w,h){
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    }

    //スプライト描画
    function drawsprite(x,y,simg){
        let sx = sprite.x;
        let sy = sprite.y;
        let sw = sprite.w;
        let sh = sprite.h;

        vcon.drawImage(simg,sx,sy,sw,sh,x,y,sw,sh);
    }

    //ゲーム関連
    const starmax = 300;
    const fps = 60;
    const starcolor = "lawngreen";
    const playerspeed = 6;
    let bolt = 0;
    
    //デバッグ関連
    const debug = document.querySelector("#debug");
    debug.innerHTML = "Success!!";

    //星を作成
    let star = [];
    for (let i = 0; i < starmax ; i ++) star[i] = new Star();

    //player作成
    const sprite = new Sprite(0,0,160,160);
    const player = new Player();

    //bullet作成
    const bullet = [new Bullet(0,25),
                    new Bullet(3,25),
                    new Bullet(-3,25)];

    //ループ呼び出し
    setInterval(loop,1000/fps);
    
};