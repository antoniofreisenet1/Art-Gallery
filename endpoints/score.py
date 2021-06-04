from silence.decorators import endpoint

@endpoint(
    route="/score",
    method="GET",
    sql="SELECT * FROM score"
)
def get_all():
    pass

@endpoint(
    route = "/score",
    method="POST",
    sql = "INSERT INTO score(scoreId, photoId, userId, value) VALUES ($scoreId, $photoId, $userId, $value)",
    auth_required=True
)
def create(scoreId, photoId, userId, value):
    pass

@endpoint(
    route="/score/$photoId",
    method="GET",
    sql = "SELECT AVG(value) FROM score WHERE photoId = $photoId"
)

def avg_photo():
    pass