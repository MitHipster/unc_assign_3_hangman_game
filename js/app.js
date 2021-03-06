/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, this, alert*/

const wordId = $('#word'); // p element that holds the letter blocks
const definitionId = $('#definition'); // p element that displays definition at game's end
const incorrectId = $('#incorrect'); // p element that shows player's incorrect guesses
const puzzlesId = $('#puzzles'); // Displays total puzzle count
const playedId = $('#played'); // Displays games played 
const winsId = $('#wins'); // Displays games won
const lossesId = $('#losses'); // Displays games lost
const equationId = $('#equation'); // p element for quadratic equation used to track the number of incorrect guesses
const dataShowAttr = $('[data-show]'); // Used to re-hide any visible parts of the equation. Equation is the equivalent of a hangman
const startBtn = $('#start-btn'); // Button used to start a new game
const mathTerms = [
  ["absolute value", "The magnitude of a number. It is the number with the sign (+ or -) removed and is symbolised using two vertical straight lines."],
  ["acute angle", "An angle with measure less than 90 degrees."],
  ["addition", "The process of finding the sum of two numbers, which are called addend and the augend."],
  ["algorithm", "Any mathematical procedure or instructions involving a set of steps to solve a problem."],
  ["associative property", "A binary operation is defined associative if, for example, a*(b*c) = (a*b)*c. The operations addition and multiplication of natural numbers are associative, but subtraction and division are not."],
  ["axiom", "Any assumption on which a mathematical theory is based."],
  ["average", "The sum of several quantities divided by the number of quantities (also called mean)."],
  ["binary operation", "An operation that is performed on just two elements of a set at a time."],
  ["butterfly effect", "In a system when a small change results in an unpredictable and disproportionate disturbance."],
  ["calculus", "Branch of mathematics concerned with rates of change, gradients of curves, maximum and minimum values of functions, and the calculation of lengths, areas and volumes."],
  ["chaos", "Apparent randomness whose origins are entirely deterministic. A state of disorder and irregularity whose evolution in time, though governed by simple exact laws, is highly sensitive to starting conditions."],
  ["chord", "A straight line joining two points on a curve or a circle."],
  ["coefficient", "A number or letter before a variable in an algebraic expression that is used as a multiplier."],
  ["common denominator", "A denominator that is common to all fractions within an equation."],
  ["complementary angles", "Two angles whose sum is 90 degrees."],
  ["constant", "A quality of measurement that never changes in magnitude."],
  ["coordinate", "A set of numbers that locates the position of a point usually represented by (x,y) values."],
  ["cube root", "The factor of a number that, when it is cubed (i.e. x to the power of 3), gives that number."],
  ["curve", "A line that is continuously bent."],
  ["decimal", "A fraction having a power of ten as denominator, such as 0.34 = 34/100 (10 squared) or 0.344 = 344/1000 (10 cubed)."],
  ["denominator", "The bottom number in a fraction."],
  ["derivative", "The derivative at a point on a curve is the gradient of the tangent to the curve at the given point."],
  ["diameter", "A straight line that passes from side to side thorough the centre of a circle."],
  ["differential equation", "Equations involving total or partial differentiation coefficients and the rate of change; the difference between some quantity now and its value an instant into the future."],
  ["digit", "In a decimal system, the numbers 0 through 9."],
  ["dimension", "Either the length and/or width of a flat surface (two-dimensional); or the length, width, and/or height of a solid (three-dimensional)."],
  ["division", "The operation of ascertaining how many times one number, the divisor, is contained in another, the dividend. The result is the quotient, and any number left over is called the remainder."],
  ["equilibrium", "The state of balance between opposing forces or effects."],
  ["exponent", "A number denoted by a small numeral placed above and to the right of a numerical quantity, which indicates the number of times that quantity is multiplied by itself."],
  ["extrapolation", "Estimating the value of a function or a quantity outside a known range of values."],
  ["factor", "When two or more natural numbers are multiplied, each of the numbers is a factor of the product."],
  ["fibonacci sequence", "Sequence of integers, where each is the sum of the two preceding it. 1,1,2,3,5,8,13,21,..."],
  ["fraction", "A portion of a whole amount. The term usually applies only to ratios of integers (like 2/3, 5/7)."],
  ["function", "The mathematical operation that transforms a piece of data into a different one. For example, f(x) = x2 is a function transforming any number to its square."],
  ["gradient", "The slope of a line. The gradient of two points on a line is calculated as rise (vertical increase) divided by run (horizontal increase)."],
  ["hypotenuse", "The longest side of a right triangle, which lies opposite the vertex of the right angle."],
  ["improper fraction", "A fraction whose numerator is the same as or larger than the denominator."],
  ["infinite", "Having no end or limits. Larger than any quantified concept. For many purposes it may be considered as the reciprocal of zero."],
  ["integer", "Any whole number: positive, negative, or zero."],
  ["intersection", "The intersection of two sets is a group of elements found in both sets."],
  ["inverse function", "A function which 'does the reverse' of a given function."],
  ["iteration", "Repeatedly performing the same sequence of steps."],
  ["linear", "A model or function where the input and output are proportional."],
  ["logarithm", "The logarithm of a number N to a given base b is the power to which the base must be raised to produce the number N."],
  ["matrix", "A matrix is a rectangular table of data."],
  ["multiplication", "The process of finding the product of two quantities that are called the multiplicand and the multiplier."],
  ["numerator", "The top number in a fraction."],
  ["obtuse angle", "An angle with a degree measure between 90 and 180 degrees"],
  ["origin", "The point on a graph that represents the point where the x and y axes meet: (x,y) = (0,0)."],
  ["parallel", "Lines or planes that are equidistant from each other and do not intersect."],
  ["perpendicular", "At right angles to a line or plane."],
  ["polygon", "A geometric figure that is bound by many straight lines such as triangle, square, pentagon, hexagon, etc."],
  ["prime number", "A natural number other than 1, evenly divisible only by 1 and itself. The numbers 2,3,5,7,11,13,17,19, and so on. Apart from 2, all primes are odd numbers."],
  ["product", "The result of a multiplication problem"],
  ["proper fraction", "A fraction in which the numerator is smaller than the denominator."],
  ["proportion", "A type of ratio in which the numerator is included in the denominator. It is the ratio of a part to the whole (0.0 ≤ p ≤ 1.0) that may be expressed as a decimal fraction (0.2), vulgar fraction (1/5) or percentage (20%)."],
  ["quadratic equation", "An algebraic equation of the second degree (having one or more variables raised to the second power)."],
  ["quotient", "An algebraic expression in which the numerator is divided by the denominator."],
  ["radius", "The distance between the centre of a circle and any point on the circle's circumference."],
  ["ratio", "The relationship between two numbers or measurements, usually with the same units, like the ratio of the width of an object to its length."],
  ["reciprocal", "The multiplicative inverse of a number (i.e. 1/x)."],
  ["right angle", "An angle with a 90 degree measure."],
  ["rounding", "To give a close approximation of a number by dropping the least significant numbers."],
  ["sequence", "An ordered set of numbers derived according to a rule, each member being determined either directly or from the preceding terms."],
  ["straight line", "A straight line is characterised by an equation (y = a + bx), where a is the intercept and b is the gradient/slope."],
  ["subtraction", "The inverse operation of addition. In the notation a - b = c, the terms a, b, and c are called the minuend, subtrahend and difference, respectively."],
  ["tangent", "A tangent line is a line, which touches a given curve at a single point. The slope of a tangent line can be approximated by a secant line."],
  ["triangle", "A three-sided figure that can take several shapes. The three inside angles add up to 180 degrees. Triangles are divided into three basic types: obtuse, right and acute."],
  ["union", "The union of two sets is the set of elements that are in either of the two sets."],
  ["variable", "An amount whose value can change."],
  ["vertex", "The point where lines intersect."],
  ["whole number", "Zero or any positive number with no fractional parts."]
]; // Array of puzzles

// Game object with functions
let game = {
  wins: 0,
  losses: 0,
  puzzles: mathTerms.length,
  played: 0,
  gameOver: false, // Condition used to ignore keypress after game finishes
  terms: mathTerms,
  word: "",
  definition: "",
  letters: [], // Array of puzzle letters
  letterCount: 0,
  matched: [], // Array of matched letters
  matchedCount: 0,
  incorrect: [], // Array of incorrect guesses
  incorrectCount: 0,
  incorrectMax: 8, // Max number of incorrect guess allowed
  fn: {
    // Function to create and append blocks for each letter in the puzzle. Line break added for two-word puzzles
    letterBlocks: function (word) {
      // Split word string into an array of letters
      game.letters = word.split('');
      // Iterate through letters array to create a span for each letter or a break for a space between words.
      $.each(game.letters, function (i, letter) {
        if ($.trim(letter).length !== 0) {
          wordId.append(`<span class="letter" data-letter="${i}">_</span>`);
          game.letterCount++;
        } else {
           wordId.append('<br>');
        }
      });
    },
    // Function to bind the keypress event listener to the body element
    keyPress: function () {
      $('body').keypress( function (e) {
        var guess;
        // If game not over and keycode represents a-z or A-Z, convert code to lower case letter equivalent
        if ((!game.gameOver) &&
           ((e.which >= 65 && e.which <= 90) || 
           (e.which >= 97 && e.which <= 122))) {
          guess = String.fromCharCode(e.which).toLowerCase();
          // Call checkGuess function and pass the guessed letter
          game.fn.checkGuess(guess);
        } else if (e.which === 32) {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    },
    // Function to see if the guessed letter is found in the letters array
    checkGuess: function (guess) {
      let counter = 0;
      // Compare guess to each letter in the array unless it's found in the matched array (meaning played selected same letter more than once)
      $.each(game.letters, function (i, letter) {
        if (letter === guess && game.matched.indexOf(guess) === -1) {
          // Count the number of letters matched
          counter++;
          // Use data attribute and array index to find span in DOM then add matched class (for styling) and replace dash with matched letter
          wordId.find(`[data-letter="${i}"]`).addClass("matched").text(guess);
          // If letter is a repeat, meaning it already exits in the matched array, set counter to -1, essentially ignoring it
        } else if (game.matched.indexOf(guess) !== -1) {
          counter = -1;
        }
      });
      // If match is found, call updateMatched function passing counter and guess values
      if (counter > 0) {
        game.fn.updateMatched(counter, guess);
      // Else if no match is found and the incorrect guess is not a repeat, call updateIncorrect passing guess value
      } else if (counter === 0 && game.incorrect.indexOf(guess) === -1) {
        game.fn.updateIncorrect(guess);
      }
    },
    // Function to update the matched array with correct guess and increment matchedCount by the counter value
    updateMatched: function (counter, guess) {
      game.matched.push(guess);
      game.matchedCount += counter;
      // Call isGameOver function with won argument to see if matched guess resulted in a win
      game.fn.isGameOver('won');
    },
    // Function to update the incorrect array with incorrect guess and increment incorrectCount by 1
    updateIncorrect: function (guess) {
      game.incorrect.push(guess);
      game.incorrectCount += 1;
      // Sort incorrect array alphabetically, convert to string, and replace commas with spaces
      let incorrectSort = game.incorrect.sort();
      incorrectSort = incorrectSort.toString().replace(/,/g , ' ');
      // Update text in element with new incorrect string
      incorrectId.text(incorrectSort);
      // Call changeEquation function
      game.fn.changeEquation();
      // Call isGameOver function with lost argument to see if incorrect guess resulted in a loss
      game.fn.isGameOver('lost');
    },
    // Function to show next part of the equation. Player losses if equation is completed
    changeEquation: function () {
      // Use data attribute and incorrect count as index to find span in DOM then change visibility setting to visible
      equationId.find(`[data-show="${game.incorrectCount}"]`).css("visibility", "visible");
    },
    // Function to see if game is over after each correct or incorrect guess
    isGameOver: function (check) {
      // If matchedCount equals letterCount, game is won. Change gameOver to true and call showDefinition and updateStats functions
      if (check === 'won' && game.matchedCount === game.letterCount) {
        game.gameOver = true;
        game.fn.showDefinition();
        game.fn.updateStats('wins', winsId);
      // If incorrectCount equals incorrectMax, game is lost. Change gameOver to true and call showDefinition and updateStats functions
      } else if (check === 'lost' && game.incorrectCount === game.incorrectMax) {
        game.gameOver = true;
        game.fn.showDefinition();
        game.fn.updateStats('losses', lossesId);
      }
    },
    // Function to show word and definition when game is over
    showDefinition: function () {
      definitionId.text(game.word.toUpperCase() + ": " + game.definition);
    },
    // Function to update stats when game is over
    updateStats: function (outcome, id) {
      // Increase either wins or losses count
      game[outcome] += 1;
      // Increase games played count
      game.played += 1;
      // Update text on site
      id.text(game[outcome]);
      playedId.text(game.played);
    },
    // Function to reset game when new game button is clicked
    gameReset: function () {
      // Empty puzzle, definition, and incorrect guesses containers
      wordId.empty();
      definitionId.empty();
      incorrectId.empty();
      // Re-hide any visible parts of the equation.
      dataShowAttr.css("visibility", "hidden");
      // Reset counts and arrays used to track game progress
      game.letterCount = 0;
      game.matched = [];
      game.matchedCount = 0;
      game.incorrect = [];
      game.incorrectCount = 0;
    }
  }
};

// Get and display total number of puzzles
puzzlesId.text(game.puzzles);

// Function to generate the random value used to select the next puzzle
let randomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

// On click event to start a new game
startBtn.on('click', function () {
  // Reset game over to false
  game.gameOver = false;
  // Get random value based on the number of puzzles left unless puzzles left equal zero
  if (game.terms.length !== 0) {
    let i = randomNumber(game.terms.length);
    // Get and assign word and definition to the game object
    game.word = game.terms[i][0];
    game.definition = game.terms[i][1];
    // Remove puzzle from object array
    game.terms.splice(i, 1);
    // Call function to reset game
    game.fn.gameReset();
    // Call function to generate the puzzle's letter blocks
    game.fn.letterBlocks(game.word);
    // Call function to bind keypress event to body element
    game.fn.keyPress();
  // If unplayed puzzle count is zero, display message below
  } else {
    definitionId.text("No More Puzzles. Thank you for playing.");
  }
});

// Keyup event to stop a new puzzle from loading when new game button is in focus and spacebar is accidently pressed
$('body').keyup( function (e) {
  if(e.which === 32) {
  	e.preventDefault();
  }
});
