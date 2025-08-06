function CreateUser() {
  return (
    <form>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        className="input mb-8 w-72"
      />

      {/* <div>
          <Button type="primary">Start ordering</Button>
        </div> */}
    </form>
  );
}

export default CreateUser;
