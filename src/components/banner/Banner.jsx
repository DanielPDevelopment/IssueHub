import logo from 'assets/img/logo/logo2A.png';

const Banner = () => (
  <div
    className="flex w-full flex-col rounded-[20px] bg-cover bg-bottom py-[20px] md:py-[10px] px-4 hidden md:block"
  >
    <div className="w-full">
      <div className="flex items-end pl-2 pt-2">
        <img
          src={logo}
          alt="Logo"
          className="h-20"
          style={{ width: 'auto' }}
        />
        <span className="text-gray-500 ml-[-5px] leading-[54px] text-[30px]">
          ssue
          <span className="font-bold text-orange-0">
            <span className="">h</span>
            ub
          </span>
        </span>
      </div>
      <div className="md:flex md:justify-start">
        <h4 className="font-architectsDaughter line-through text-xl font-bold text-white/80 md:text-3xl md:leading-[42px]">
          Find GitHub issues.
        </h4>

        <p className="font-architectsDaughter md:pl-2 text-xl font-bold text-green-400/80 md:text-3xl md:leading-[42px]">
          Fix GitHub Issues
        </p>
      </div>
    </div>
  </div>
);

export default Banner;
