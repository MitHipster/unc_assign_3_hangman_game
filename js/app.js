/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, this, alert*/

const wordId = $('#word');
const incorrectId = $('#incorrect');
const letterCl = $('.letter');
const matchedCl = $('.matched');
const puzzlesId = $('#puzzles');
const playedId = $('#played');
const winsId = $('#wins');
const lossesId = $('#losses');
const equationId = $('#equation');
const dataShowAttr = $('[data-show]');
const startBtn = $('#start-btn');
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
  ["chaos", "Apparent randomness whose origins are entirely deterministic. A state of disorder and irregularity whose evolution in time, though governed by simple exact laws, is highly sensitive to starting conditions: a small variation in these conditions will produce wildly different results, so that long-term behaviour of chaotic systems cannot be predicted."],
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
  ["intersection", "The intersection of two sets is a set of elements found in both sets."],
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
];

let game = {
  wins: 0,
  losses: 0,
  puzzles: mathTerms.length,
  played: 0,
  gameOver: false,
  terms: mathTerms,
  word: "",
  definition: "",
  letters: [],
  letterCount: 0,
  matched: [],
  matchedCount: 0,
  incorrect: [],
  incorrectCount: 0,
  incorrectMax: 8,
  fn: {
    letterBlocks: function (word) {
      console.log(word);
      game.letters = word.split('');
      $.each(game.letters, function (i, letter) {
        if ($.trim(letter).length !== 0) {
          wordId.append(`<span class="letter" data-letter="${i}">_</span>`);
          game.letterCount++;
        } else {
           wordId.append('<br>');
        }
      });
    },
    keyPress: function () {
      $('body').keypress( function (e) {
        var guess;
        if ((!game.gameOver) &&
           ((e.which >= 65 && e.which <= 90) || 
           (e.which >= 97 && e.which <= 122))) {
          guess = String.fromCharCode(e.which).toLowerCase();
          game.fn.checkGuess(guess);
        }
      });
    },
    checkGuess: function (guess) {
      let counter = 0;
      $.each(game.letters, function (i, letter) {
        if (letter === guess && game.matched.indexOf(guess) === -1) {
          counter++;
          wordId.find(`[data-letter="${i}"]`).addClass("matched").text(guess);
        } else if (game.matched.indexOf(guess) !== -1) {
          counter = -1;
        }
      });
      if (counter > 0) {
        game.fn.updateMatched(counter, guess);
      } else if (counter === 0 && game.incorrect.indexOf(guess) === -1) {
        game.fn.updateIncorrect(guess);
      }
    },
    updateMatched: function (counter, guess) {
      game.matched.push(guess);
      game.matchedCount += counter;
      game.fn.isGameOver('won');
    },
    updateIncorrect: function (guess) {
      game.incorrect.push(guess);
      game.incorrectCount += 1;
      let incorrectSort = game.incorrect.sort();
      incorrectSort = incorrectSort.toString().replace(/,/g , ' ');
      incorrectId.text(incorrectSort);
      equationId.find(`[data-show="${game.incorrectCount}"]`).css("visibility", "visible");
      game.fn.isGameOver('lost');
    },
    isGameOver: function (check) {
      if (check === 'won' && game.matchedCount === game.letterCount) {        
        game.gameOver = true;
        game.fn.updateStats('wins', winsId);
      } else if (check === 'lost' && game.incorrectCount === game.incorrectMax) {
        game.gameOver = true;
        game.fn.updateStats('losses', lossesId);
      }
    },
    updateStats: function (outcome, id) {
      game[outcome] += 1;
      game.played += 1;
      id.text(game[outcome]);
      playedId.text(game.played);
    },
    gameReset: function () {
      wordId.empty();
      incorrectId.empty();
      dataShowAttr.css("visibility", "hidden");
      game.letterCount = 0;
      game.matched = [];
      game.matchedCount = 0;
      game.incorrect = [];
      game.incorrectCount = 0;
    }
  }
};

puzzlesId.text(game.puzzles);

let randomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

startBtn.on('click', function () {
  game.gameOver = false;
  let i = randomNumber(game.terms.length);
  game.word = game.terms[i][0];
  game.definition = game.terms[i][1];
  game.terms.splice(i, 1);
  game.fn.gameReset();
  game.fn.letterBlocks(game.word);
  game.fn.keyPress();
});
