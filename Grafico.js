/* 
    Made for use with p5js
*/

class Grafic{

    constructor(width, height, escalaPorc){
        this.width = width
        this.height = height
        this.escala
        this.origin= {
            x: (0.06*this.height),
            y: (0.94*this.height)
        }
        this.limits = {
            x: (0.95*width),
            y: (0.06*height)
        }

        this.getPlane()
    }

    //build graphic from an array of points
    constructStaticResults(pointArray, color){
        if(pointArray.length < 2) throw console.error("Pontos insuficientes para construir")        
        
        for(let i = 0; i<(pointArray.length-1); i++){
            line(
                map(i, 0, pointArray.length, this.origin.x, this.limits.x), // x1
                map(pointArray[i], 0, max(pointArray), this.limits.y, this.origin.y), //y1
                map((i+1), 0, pointArray.length, this.origin.x, this.limits.x), //x2
                map(pointArray[i+1], 0, max(pointArray), this.limits.y, this.origin.y) // y2
            );
        }
    }

    //same as above, but with y max value defined
    constructStaticResults(pointArray, color, max){
        if(pointArray.length < 2) throw console.error("Pontos insuficientes para construir")        
        
        for(let i = 0; i<(pointArray.length-1); i++){
            line(
                map(i, 0, pointArray.length, this.origin.x, this.limits.x), // x1
                map(pointArray[i], 0, max, this.limits.y, this.origin.y), //y1
                map((i+1), 0, pointArray.length, this.origin.x, this.limits.x), //x2
                map(pointArray[i+1], 0, max, this.limits.y, this.origin.y) // y2
            );
        }
    }

    constructAnimatedResults(func, color, px1){ //funcao a ser desenhada e cor da linha
        stroke(color)
        strokeWeight(3)

        let px2 = px+1
        

        let x1 = (px-this.origin.x)/this.escala // x1 = px1 / (px/un)
        let x2 = (px2-this.origin.x)/this.escala // x2 = px1 + 1 / px/un
        let py1 = this.origin.y - (func(x1) * this.escala) // Y1 px  =  Y1 un * E px/un
        let py2 = this.origin.y - (func(x2) * this.escala) // Y2 px  =  Y2 un * E px/un


        //pedaco de codigo para fins de debug
        /* let vars = {
            px,
            px2,
            py1,
            py2,
            x1,
            x2,
            y1 : func(x1),
            y2: func(x2),
        }
        console.log(obj) */

        line(px,py1,px2,py2)
    }

    //constroi o grafico cartesiano
    getCartesianPlane(){ 
        //origem do plano fica a 6% da origem do gráfico
        // O(0.06*h , 0.94h)
        
        //desenha ponto na origem

        noStroke()
        //ellipse(this.origin.x,this.origin.y,0.035*this.height,0.035*this.height)
        //fill(255)
    

        //desenha eixos do plano
        
        let arrowLength = 0.02*this.height        
        stroke(255)
        strokeWeight(4)

        //desenha eixo y
        line(this.origin.x, this.origin.y, this.origin.x, 0.05*this.height)
        //desenha flecha à esquerda do eixo Y
        line(this.origin.x, 0.05*this.height, this.origin.x-(arrowLength)*cos(PI/3), 0.05*this.height+(arrowLength)*sin(PI/3))
        //desenha flecha à direita do eixo y
        line(this.origin.x, 0.05*this.height, this.origin.x+(arrowLength)*cos(PI/3), 0.05*this.height+(arrowLength)*sin(PI/3))
        
        //desenha eixo x
        line(this.origin.x, this.origin.y, 0.95*this.width, this.origin.y)
        //desenha flecha abaixo do eixo x
        line(0.95*this.width,this.origin.y, 0.95*this.width-(arrowLength*cos(-PI/6)) , this.origin.y-(arrowLength*sin(-PI/6)))
        //desenha flecha acima do eixo y
        line(0.95*this.width,this.origin.y, 0.95*this.width-(arrowLength*cos(-PI/6)) , this.origin.y+(arrowLength*sin(-PI/6)))
        
    }
}