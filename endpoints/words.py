from silence.decorators import endpoint

@endpoint(
    route="/words",
    method="GET",
    sql="SELECT * FROM words"
)
def get_all():
    pass
