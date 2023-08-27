class ResourceNotFoundException extends Error {
  constructor(msg: string = "Resource not found") {
    super(msg);
  }
}

export default ResourceNotFoundException;
