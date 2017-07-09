var difficulty = 2; //By default the difficulty is set to Hard.
var colorList = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var result = document.querySelector("#result");
var h1 = document.querySelector("h1");
var resetBut = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".modeBtn");
//var easyBtn = document.querySelector("#easyBtn");
//var hardBtn = document.querySelector("#hardBtn");

init();

/*This is the initialize function which is used to :
1. Set the event listeners for difficulty buttons(mode) and the squares.
2. Set the background color for the different squares
3. Pick the color to be guessed*/

function init()
{
	setupModeBtns();
	setupSquares();
	reset();
}

function setupModeBtns()
{
	for(var i = 0; i<modeBtn.length;i++)
	{
		modeBtn[i].addEventListener("click",function()
		{
			removeClass();
			this.classList.add("selected");
			this.textContent === "Easy" ? difficulty = 1: difficulty = 2;
			reset();
		});
	}
}

function setupSquares()
{
	for(var i=0; i<squares.length;i++)
	{
		squares[i].addEventListener("click", function()
		{
			var selectedColor = this.style.backgroundColor;

			if(selectedColor === pickedColor)
			{
				result.textContent = "Correct";
				changeColor(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetBut.textContent = "Play Again?";
			}
			else
			{
				this.style.backgroundColor = "#232323";
				result.textContent = "Try Again";
			}
		});
	}
}



/*Logic for easy button:
1. Add selected class for easy button
2. Remove selected class for hard button
3. Generate new Color List. The list should only contain 3 colors.
4. Set the background color for each square(3 square's color is set).
5. Set the display for remaining square to None.
6. Select the new color to be guessed.
*/

/*easyBtn.addEventListener("click", function()
{
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	difficulty = 1;
	colorList = colorGenerator(difficulty);
	//console.log(colorList);
	//setColor();
	for(var i = 0; i<squares.length;i++)
	{
		if(colorList[i])
		{
			squares[i].style.backgroundColor = colorList[i];
		}
		else
		{
			squares[i].style.display = "none";
		}
	}
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
});*/

/*Logic for hard button:
1. Add selected class for hard button
2. Remove selected class for easy button
3. Generate new Color List. The list would contain 6 colors.
4. Set the background color for each square.
5. Set the display for square to block.
6. Select the new color to be guessed.
*/

/*hardBtn.addEventListener("click", function()
{
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	difficulty = 2;
	colorList = colorGenerator(difficulty);
	//setColor();
	for(var i = 0; i<squares.length;i++)
	{
		squares[i].style.display = "block";
		squares[i].style.backgroundColor = colorList[i];
	}
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
});*/


resetBut.addEventListener("click", function()
{
	reset();
});

/*Logic for Reset Function:
1. Generate new Color List. The number of colors the list would contain would depend on the difficulty
2. Pick new color to be guessed.
3. Set the squares background color to the colors in the color list.
4. Set the background color of h1 to the default color(steelblue). This is done because color of h1 changes when the correct color is changed.
5. Set the result to none
6. Set the reset button's text back to "New Colors"
*/ 

function reset()
{
	colorList = colorGenerator(difficulty);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	setColor();
	h1.style.backgroundColor = "steelblue";
	result.textContent = "";
	resetBut.textContent = "New Colors";
}

function removeClass()
{
	for(var i = 0; i<modeBtn.length;i++)
	{
		modeBtn[i].classList.remove("selected");
	}
}

//Function used to generate Random Colors. Number of colors generated is based on Difficulty
function colorGenerator (difficulty) 
{

	var arr = [];
	
	if(difficulty === 1)//Easy Difficulty
	{
		for(var i = 0; i<3; i++)
		{
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var color = createColorString(r,g,b)
			arr[i] = color;
		}
	}
	else if(difficulty === 2)//Hard Difficulty
	{
		for(var i = 0; i<6; i++)
		{
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var color = createColorString(r,g,b)
			arr[i] = color;
		}
	}

	return arr;
}

//Function used to create Color String
function createColorString(r,g,b) 
{
	var color = "rgb("+r+", "+g+", "+b+")";
	return color;
}

//Picking the Color which has the user has to guess
function pickColor () 
{
	var color = Math.floor(Math.random()*colorList.length);
	return colorList[color];
}

//Changing all the squares background color to the correct color. This happens when the user guesses the correct color.
function changeColor(color) 
{
	for(var i = 0; i<squares.length;i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

//Function to set the background color of the squares to the ones in the color list.
function setColor()
{
	for(var i = 0; i<squares.length;i++)
	{
		if(colorList[i])
		{
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colorList[i];
		}
		else
		{
			squares[i].style.display = "none";
		}
	}
		
}
