import assert from 'assert';
import tweets from '../../assets/js/tweets';

describe('Tweets', function() {
  describe('#getTweets(term)', function() {
    it('returns a list of tweets when takes a term', function(done) {
      tweets.getTweets('elixir').then(result => {
        const total = result.length;
        assert.ok(total > 0);
        done();
      });
    });
  });
  describe('#getTweets(term)', function() {
    it('returns an empty list when a term is not provided', function(done) {
      const total = tweets.getTweets().then(result => {
        const total = result.length;
        assert.strictEqual(total, 0);
        done();
      });
    });
  });
});
