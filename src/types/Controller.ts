import { Model } from "@/types";

abstract class Controller<M extends Model = Model> {
  model: M;
}

export default Controller;
