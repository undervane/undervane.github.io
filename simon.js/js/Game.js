
class Game {

    constructor(){

        this.colors = this.getColors();
        this.steps = 0;
        this.current = [];
        this.choices = [];
        this.i = 0;
        this.listening = false;
        this.playing = false;

    }

    // Call this to get game colors from HTML

    getColors(){

        let elements = $(".box");
        let colors = [];
    
        for (let element of elements){
    
            let id = $(element).attr("id");

            colors.push(id);
    
        }
    
        return colors;
    
    }
}
