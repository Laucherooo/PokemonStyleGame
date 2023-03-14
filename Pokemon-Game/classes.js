class Sprite {
	constructor({position, velocity, image, frames = {max: 1}, sprites }){
		this.position = position
		this.image = image
		this.frames = {...frames, val: 0, elapsed: 0}
		
		this.image.onload = () =>{
			this.width = this.image.width/this.frames.max
			this.height = this.image.height
		}
		this.moving = false
		this.sprites = sprites
	}
	
	draw() {
		//c.drawImage(this.image, this.position.x, this.position.y) //image, x, y'
		c.drawImage(
			this.image,
			this.frames.val * this.width,//cropping
			0,//cropping
			this.image.width/this.frames.max,//cropping
			this.image.height,//cropping
			this.position.x,
			this.position.y,
			this.image.width/this.frames.max,//actual position
			this.image.height//actual position
		)
		
		if(!this.moving) return
		
		if(this.frames.max > 1){
			this.frames.elapsed++
		}

		if(this.frames.elapsed % 20 === 0){//% + more, player moves slower
			if(this.frames.val < this.frames.max - 1) this.frames.val++
			else this.frames.val = 0
		}
	}
}

class Boundary {
	static width = 48
	static height = 48
	constructor({position}){
		this.position = position
		this.width = 48//map zoomed in to 400 %
		this.height = 48//so the px need to x4 -> 12x4=48
	}
	
	draw(){
		c.fillStyle = 'rgba(255, 0, 0, 0.0)'//last argument is the transparency
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}