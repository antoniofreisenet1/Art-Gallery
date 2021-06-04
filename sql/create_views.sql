CREATE OR REPLACE VIEW PhotosWithUsers AS
    SELECT P.*, U.username, U.avatarUrl
    FROM photos P NATURAL JOIN users U;

CREATE OR REPLACE VIEW commentsfromusers AS
	SELECT comnt.* FROM comnt JOIN users ON (comnt.userId = users.userId);

CREATE OR REPLACE VIEW scoresonphotosfromusers AS
	SELECT score.* FROM score JOIN users ON (users.userId = score.userId)
								JOIN photos ON (photos.photoId = score.photoId);
