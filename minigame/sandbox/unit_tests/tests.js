test( "hello test", function() {
	ok( 1 == "1", "Passed!" );
	ok( 0 != "1", "Passed!" );
});

test("Character test", function() {
	var character = new Character("ID");
	equal(100, character.getCurrentLife(), "Character creation max life OK");
	character.setCurrentLife(50);
	equal(50, character.getCurrentLife(), "Character set currentLife OK");
});

test("Point test", function() {
	var point = new Point(0, 0);
	equal(0, point.x, "New Point good x");
	equal(0, point.y, "New Point good y");
	ok(!point.z, "New Point good undefined z");
	point = new Point( 2, 12, 9);
	equal(2, point.x, "setPoint good x");
	equal(12, point.y, "setPoint good y");
	equal(9, point.z, "setPoint good z");
});
