import "./page.scss";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row headerBar">
        <div className="col">
          <div className="container p-2">
            <div className="row m-0">
              <div className="col">
                <p>Bienvenidos</p>
              </div>
              <div className="col text-end">
                <p>Menu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="mt-3 col-12 col-md-8">
            <div className="box">
              <p>
                111111
              </p>
            </div>
          </div>
          <div className="mt-3 col-6 col-md-2">
            <div className="box">
              <p>
                22222
              </p>
            </div>
          </div>
          <div className="mt-3 col-6 col-md-2">
            <div className="box">
              <p>
                33333
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}