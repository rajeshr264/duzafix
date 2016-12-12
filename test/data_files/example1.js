function testLiteral(size) {

  // Build object-literal string.
  var literal = "var o = { ";

  for (var i = 0; i < size; i++) {
    if (i > 0) literal += ",";
    literal += ("a" + i + ":" + i);
  }
  literal += "}";

  // Create the object literal.
  eval(literal);

  // Force normalization of the properties.
  delete o["a" + (size - 1)];

  // Perform GC.
  gc();

  // Check that the properties have the expected values.
  for (var i = 0; i < size - 1; i++) {
    assertEquals(i, o["a"+i]);
  }
}
