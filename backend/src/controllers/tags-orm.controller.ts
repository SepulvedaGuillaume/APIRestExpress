import { Request, Response } from "express";
import Tag from "../sql/entities/Tag";

const getAllTags = async (req: Request, res: Response): Promise<any> => {
  try {
    const tags = await Tag.find();

    return res.status(200).send(tags);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getTagsByName = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.params;

    const tags = await Tag.find({
      where: {
        name: name,
      },
    });

    return res.status(200).send(tags);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const deleteTag = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    await Tag.delete(id);

    return res
      .status(200)
      .send(`The tag with id ${id} has been deleted`);
  } catch (error) {
    console.log(error);

    return res.status(500).send("An error occurred");
  }
};

export { getAllTags, getTagsByName, deleteTag };
