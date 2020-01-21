from flask import Flask
from flask import request,jsonify,make_response
from flask_cors import CORS
from flask_mysqldb import MySQL
import json

app = Flask(__name__,static_url_path = '/static')
CORS(app)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Meena@sql@123"
app.config["MYSQL_DB"] = "movie_api"
app.config["MYSQL_CURSOR"] = "DictCursor"
mysql = MySQL(app)

# add movie detals into db
@app.route('/add_movie',methods=["POST"])
def editProfile():
    movie_name = request.headers.get("movie_name")
    if request.method == 'POST':
        f = request.files['movie_poster']
        location = "static/img/" + f.filename
        f.save(location)
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO movie_details (movie_name, movie_poster) VALUES (%s, %s) """, [movie_name,location])
    mysql.connection.commit()
    cursor.close()
    return {"message":"Added Successfully"}

# show all movies
@app.route('/show_movies',methods = ['GET'])
def showMovies():
    cursor = mysql.connection.cursor()
    cursor.execute("select * from movie_details")
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

# search movie
@app.route('/search_movie',methods = ['POST'])
def searchMovie():
    movie_name = request.json["movie_name"]
    cursor = mysql.connection.cursor()
    string = f"%{movie_name}%"
    cursor.execute(
        """select * from movie_details where movie_name like (%s) """,[string]
    )
    result = cursor.fetchall()
    cursor.close()
    return json.dumps(result)

# update movie
@app.route('/update_movie',methods = ['POST'])
def updateMovie():
    movie_id = request.json["movie_id"]
    movie_name = request.json["movie_name"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """update movie_details set movie_name = (%s) where movie_id = (%s)""", [movie_name,movie_id]
        )
    mysql.connection.commit()
    cursor.close()
    return {"message":"Updated Successfully"}

# delete movie
@app.route('/delete_movie',methods = ['POST'])
def deleteMovie():
    movie_id = request.json["movie_id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """delete from  movie_details where movie_id = (%s)""", [movie_id]
        )
    mysql.connection.commit()
    cursor.close()
    return {"message":"Deleted"}