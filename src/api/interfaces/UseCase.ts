interface UseCase<I, O> {
    execute(input: I): O
  }
  
  export default UseCase