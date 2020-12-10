var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color["Blue"] = "Green";
})(Color || (Color = {}));
console.log(Color['Green']);
console.log(Color.Blue);
console.log(Color[2]);
