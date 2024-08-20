const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Adaugă",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full text-black"
          placeholder="Scrie numele categoriei."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="btn btn-primary w-[15rem] px-4 py-2 rounded my-[0.5rem] focus:outline-none
          focus:ring-cyan-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="btn btn-primary w-[15rem] px-4 py-2 rounded my-[0.5rem] focus:outline-none
          focus:ring-cyan-500 focus:ring-opacity-50 ml-[2rem]"
            >
              Șterge
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
