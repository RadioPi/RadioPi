function Song(name){
	this.name = name;
	this.id = guid();
	this.votes = {
		up: 0,
		down: 0
	};
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


Song.prototype.getVotes = function() {
	return this.votes;
};

Song.prototype.upvote = function() {
	this.votes = {
		up: this.votes.up + 1,
		down: this.votes.down
	};
};

Song.prototype.downvote = function() {
	this.votes = {
		up: this.votes.up,
		down: this.votes.down + 1
	};
};

module.exports = Song;