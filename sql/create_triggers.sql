--RN-C01 LIMITE DE FOTOS

DELIMITER //
CREATE OR REPLACE TRIGGER triggerPhotoLimits 
AFTER INSERT ON photos FOR EACH ROW
BEGIN
    IF((SELECT COUNT(photoId) FROM photos WHERE userId = new.userId) > 50) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Maximum number 
                                                    of photos per user are 50';
    END IF;
END //
DELIMITER ;

--RN-C02: BOCA SUSIA
DELIMITER //
CREATE OR REPLACE TRIGGER triggerInappropriateLanguage
    BEFORE INSERT ON Photos FOR EACH ROW
    BEGIN
        DECLARE tituloC INT DEFAULT 0;
        DECLARE descripcionC INT DEFAULT 0;
        SET tituloC = (SELECT COUNT(photoId) FROM photos WHERE photos.title LIKE (SELECT text FROM words));
        SET descripcionC = (SELECT COUNT(photoId) FROM photos WHERE photos.description LIKE (SELECT text FROM words));
        IF(tituloC > 0 OR descripcionC >0) THEN 
            SIGNAL SQLSTATE '45000' SET message_text = 
			'The title or description do not meet the community guidelines.';
        END IF;
      END//
DELIMITER ;

--RN-C03: DOS USUARIOS NO PUEDEN TENER EL MISMO EMAIL O NOMBRE DE USUARIO

DELIMITER //
CREATE OR REPLACE TRIGGER triggerUserEmailCheck
	BEFORE INSERT ON users
	FOR EACH ROW
	BEGIN
	DECLARE aux INT;
	DECLARE aux2 INT;
	SET aux2 = (SELECT COUNT(userId) FROM users WHERE username = new.username);
	SET aux = (SELECT COUNT(userId) FROM users WHERE email = new.email);
	IF(aux>0) THEN
	SIGNAL SQLSTATE '45000' SET message_text = 'This email is already in use';
	END IF;
	
	IF (aux2>0) THEN 
	SIGNAL SQLSTATE '45000' SET message_text = 'This username is already in use';
	END IF;
	END//
DELIMITER ;


--RN C04: UN USUARIO NO PUEDE VALORAR MAS DE UNA VEZ UNA FOTO.

DELIMITER //
CREATE OR REPLACE TRIGGER triggerRepeatScore
	BEFORE INSERT ON score
	FOR EACH ROW
	BEGIN
	DECLARE aux INT;
	SET aux = (SELECT COUNT(*) FROM scoresonphotosfromusers WHERE userId = new.userId);
	IF (aux>0) THEN 
		SIGNAL SQLSTATE '45000' SET message_text = 'The same user cant rate a photo twice.';
	END IF;
	END//
DELIMITER ;
	
	
	
-- RN B05 SI LA FOTO TIENE COMENTARIOS, IMPEDIR ELIMINACION Y CAMBIO A PRIVADA.
DELIMITER //
CREATE OR REPLACE TRIGGER triggerDelWCmnt
    BEFORE DELETE ON photos FOR EACH ROW
    BEGIN
        DECLARE hasComments INT;
        SET hasComments = (SELECT photoId FROM photos WHERE photoId = OLD.photoId );
        IF(hasComments IN (SELECT photoId FROM commentsfromusers)) THEN
            SIGNAL SQLSTATE '45000' SET message_text = 'A photo can not be deleted if it has comments on it.';
        END IF;

    END//

DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER triggerChangeVisibilityCmnt
    BEFORE UPDATE ON photos
    FOR EACH ROW
    BEGIN
        DECLARE hasComments INT;
        DECLARE changedVisibility INT;
        SET hasComments = (SELECT photoId FROM photos WHERE photoId = new.photoId );
        SET changedVisibility = (SELECT COUNT(*) FROM photos WHERE visibility != new.visibility AND visibility = 'Public');

        IF (hasComments IN (SELECT photoId FROM commentsfromusers) AND changedVisibility > 0) THEN
        SIGNAL SQLSTATE '45000' SET message_text = 
                'A photo with comments can not be set to private.';
            END IF;

    END//

DELIMITER ;

	
	
