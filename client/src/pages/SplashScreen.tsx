const imgVector = "https://www.figma.com/api/mcp/asset/6532222f-8f47-4143-9491-b3fd91e8b0fb";
const imgVector1 = "https://www.figma.com/api/mcp/asset/5dec4288-9cdd-4b60-9872-03dd16db8204";
const imgGroup = "https://www.figma.com/api/mcp/asset/5c6a70d9-b1ff-49cd-a520-6c1c30cee83f";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/66c3a3d2-7fc1-444e-9462-9d092976acca";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/2502f8fa-bd70-42d5-9cf6-6c4dba0e5826";

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[375px] h-[812px] overflow-hidden">
        <a className="bg-[#f34147] block cursor-pointer relative size-full" data-node-id="6:151" data-name="1. Splash Screen">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[8px] items-center left-1/2 top-[calc(50%-52px)]" data-node-id="2033:6911" data-name="Auto Layout Vertical">
            <div className="overflow-clip relative shrink-0 size-[64px]" data-node-id="2046:4432" data-name="technology/08">
              <div className="absolute inset-[0.47%_6.25%]" data-node-id="I2046:4432;2033:6890" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
              </div>
            </div>
            <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-left text-white whitespace-nowrap" data-node-id="2033:6910">
              <p className="leading-[1.5]">F L O C K</p>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] left-[calc(50%-71.5px)] text-[#dfe1e7] text-[0px] text-left top-[731px] tracking-[-0.28px] whitespace-nowrap" data-node-id="2046:4431">
            <p className="text-[14px]">
              <span className="leading-[1.55]">Design by</span>
              <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[1.55] text-[#dfe1e7] tracking-[-0.28px]">{` Brain Studio`}</span>
            </p>
          </div>
          <div className="-translate-x-1/2 absolute bottom-0 h-[34px] left-1/2 w-[375px]" data-node-id="6:447" data-name="Mode=Dark">
            <div className="-translate-x-1/2 absolute bottom-[8px] h-[5px] left-[calc(50%+0.5px)] w-[148px]" data-node-id="I6:447;210:1353" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
            </div>
          </div>
          <div className="absolute content-stretch flex h-[44px] items-center justify-between leading-[0] px-[24px] py-[12px] right-[0.02px] top-0 w-[374.978px]" data-node-id="6:457" data-name="Mode=Dark">
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I6:457;210:1314">
              <p className="leading-[16px]">9:41</p>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="I6:457;7714:1504" data-name="Group">
              <div className="col-1 h-[10px] ml-0 mt-[2.5px] relative row-1 w-[18px]" data-node-id="I6:457;210:1315" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
              </div>
              <div className="col-1 h-[10.965px] ml-[23px] mt-px relative row-1 w-[15.272px]" data-node-id="I6:457;210:1321" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[44px] mt-0 place-items-start relative row-1" data-node-id="I6:457;210:1326" data-name="Group">
                <div className="col-1 h-[13px] ml-0 mt-0 relative row-1 w-[26.978px]" data-node-id="I6:457;210:1327" data-name="Group">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
