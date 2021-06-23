package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	db  *sql.DB
	err error
)

func main() {

	// setup upload directory
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", 0755)
	}

	if _, err := os.Stat("feeds"); os.IsNotExist(err) {
		os.Mkdir("feeds", 0755)
	}

	connectionString := os.Getenv("CONN")
	if connectionString == "" {
		log.Fatal("error getting connection string")
	}

	db, err = sql.Open("pgx", connectionString)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	api := echo.New()
	api.Use(middleware.CORS())

	api.GET("/", rootHandler)

	api.POST("/uploads", uploadMedia)
	api.GET("/media/*", getMediaFile)

	api.POST("/categories", createCategory)
	api.GET("/categories", getCategories)
	api.DELETE("/categories/:id", deleteCategories)
	api.PUT("/categories", updateCategories)

	api.POST("/keywords", createKeywords)
	api.GET("/keywords", getKeywords)

	api.POST("/podcasts", createPodcast)
	api.GET("/podcasts", getPodcast)
	api.GET("/podcasts/:id", getPodcastByID) // path parameters
	api.DELETE("/podcasts/:id", deletePodcast)
	api.PUT("/podcasts", updatePodcast)

	api.POST("/episodes", createEpisodes)
	api.GET("/episodes", getEpisodes) // query parameters
	api.DELETE("/episodes/:id", deleteEpisodes)
	api.PUT("/episodes", updateEpisodes)

	api.POST("/users", createUser)
	api.GET("/users", getUser)
	api.DELETE("/users/:id", deleteUser)
	api.PUT("/users", updateUser)

	api.POST("/register", createUser)
	api.GET("/profile", getUser)

	api.POST("/signin", signIn)

	api.HideBanner = true
	api.Start(":9999")
}

func rootHandler(c echo.Context) (err error) {

	return c.String(http.StatusOK, "Welcome to 9Podcasts Api")
}
