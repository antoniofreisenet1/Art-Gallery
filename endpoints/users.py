from silence import sql
from silence.decorators import endpoint

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM users WHERE userId = $userId"
)
def get_by_id():
    pass


@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM users"
)

def get_all(): 
    pass