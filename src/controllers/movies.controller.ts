import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { Parser, parse } from "csv-parse";

const moviesFilePath: string = path.join(__dirname, "../utils/movies.csv");

// Configuration du parseur CSV
const parser: Parser = parse({ delimiter: ";" });

type Movie = {
  ID: string;
  Title: string;
  Year: string;
  Price: number;
  Hours: string;
};

// Transform le csv en json
let movies: Movie[] = [];

// Lire le fichier CSV et le parser
fs.createReadStream(moviesFilePath)
  .pipe(parser)
  .on("data", (row) => {
    const movie: Movie = {
      ID: row[0],
      Title: row[1],
      Year: row[2],
      Price: row[3] ? parseInt(row[3]) : 0,
      Hours: row[4],
    };
    movies.push(movie);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  })
  .on("error", (error: Error) => {
    console.error("Error reading CSV:", error);
  });

const writeMoviesToFile = (
  res: Response,
  successStatus: number,
  successMessage: string
) => {
  const updatedMovies: string = movies
    .map(
      (movie) =>
        `${movie.ID};${movie.Title};${movie.Year};${movie.Price};${movie.Hours}`
    )
    .join("\n");

  fs.writeFile(moviesFilePath, updatedMovies, (err) => {
    if (err) {
      return res.status(500).send("An error occurred");
    } else {
      return res.status(successStatus).send(successMessage);
    }
  });
};

const getCountMovies = async (req: Request, res: Response): Promise<any> => {
  try {
    const numberOfMovies: number = movies.length - 1;
    return res
      .set("Content-Type", "text/plain")
      .status(200)
      .send(numberOfMovies.toString());
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getTotalBudget = async (req: Request, res: Response): Promise<any> => {
  try {
    const totalBudget = movies.reduce((acc, movie, index) => {
      if (index === 0) return acc;
      return acc + movie.Price;
    }, 0);
    return res
      .set("Content-Type", "text/plain")
      .status(200)
      .send(`The total budget is ${totalBudget}`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getMoviesWithMinYearOrRequestedTime = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const minYear: number = Number(req.query.minYear);

    const requestedTime: number = Number(req.query.requestedTime);

    if (!isNaN(minYear)) {
      const filteredMovies: Movie[] = movies.filter((movie) => {
        return parseInt(movie.Year) >= minYear;
      });
      return res
        .set("Content-Type", "text/plain")
        .status(200)
        .send(filteredMovies);
    }

    if (requestedTime) {
      const filteredMovies: Movie[] = movies.filter((movie) => {
        return parseInt(movie.Hours) === requestedTime;
      });
      return res
        .set("Content-Type", "text/plain")
        .status(200)
        .send(filteredMovies);
    }
    return res
      .status(400)
      .send("Please provide a valid year or requested time");
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const postMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { Title, Year, Price, Hours } = req.body;
    if (!Title || !Year || !Price || !Hours) {
      return res.status(400).send("Please provide all the required fields");
    }
    const newMovie: Movie = {
      ID: (movies.length + 1).toString(),
      Title,
      Year,
      Price,
      Hours,
    };
    movies.push(newMovie);

    writeMoviesToFile(res, 201, `The movie ${Title} has been added`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const updateMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { ID, Title, Year, Price, Hours } = req.body;

    if (!ID || !Title || !Year || !Price || !Hours) {
      return res.status(400).send("Please provide all the required fields");
    }

    const movieIndex: number = movies.findIndex((movie) => movie.ID === ID);

    if (movieIndex === -1) {
      return res.status(404).send("Movie not found");
    }

    const updatedMovie: Movie = {
      ID,
      Title,
      Year,
      Price,
      Hours,
    };

    movies[movieIndex] = updatedMovie;

    writeMoviesToFile(res, 200, `The movie ${Title} has been updated`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const deleteMovies = async (req: Request, res: Response): Promise<any> => {
  type IDS = {
    IDS: number[];
  };
  try {
    const { IDS }: IDS = req.body;

    // check if the IDS param exists
    if (!IDS) {
      return res.status(400).send("Please provide the IDS");
    }

    if (IDS.length === 0) {
      return res.status(400).send("IDS should not be empty");
    }

    const IDSNotExists: number[] = IDS;
    const IDSExists: number[] = [];

    // update the csv file mention the id to delete (exist or not)
    movies = movies.filter((movie) => {
      if (IDS.includes(parseInt(movie.ID))) {
        IDSExists.push(parseInt(movie.ID));
        IDSNotExists.splice(IDSNotExists.indexOf(parseInt(movie.ID)), 1);
        return false;
      }
      return true;
    });

    const message1 =
      IDSExists.length > 0
        ? `The following movies have been deleted: ${IDSExists}.`
        : `No movies were deleted.`;
    const message2 =
      IDSNotExists.length > 0
        ? `The following movies were not found: ${IDSNotExists}.`
        : "";

    writeMoviesToFile(res, 200, `${message1} ${message2}`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

export {
  getCountMovies,
  getTotalBudget,
  getMoviesWithMinYearOrRequestedTime,
  postMovie,
  updateMovie,
  deleteMovies,
};
