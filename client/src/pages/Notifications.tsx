const imgIntersect = "https://www.figma.com/api/mcp/asset/50456347-f614-4f36-94e6-20627743250f";
const imgIntersect1 = "https://www.figma.com/api/mcp/asset/ab5fb0d6-7992-49e9-a3e6-914cf50d6b1d";
const imgIntersect2 = "https://www.figma.com/api/mcp/asset/4131edba-6219-4618-80aa-be821d99ca7a";
const imgIntersect3 = "https://www.figma.com/api/mcp/asset/88e4e9fd-26b4-4959-a83f-db3af0eae078";
const imgVariant2 = "https://www.figma.com/api/mcp/asset/54847038-594d-420f-a5c7-949b4e8c586c";
const imgVariant3 = "https://www.figma.com/api/mcp/asset/23b5e38c-eb21-4c27-a9a6-31cb8541087f";
const imgVariant4 = "https://www.figma.com/api/mcp/asset/362949f7-7ab6-4395-b4af-490bec20af19";
const imgEllipse = "https://www.figma.com/api/mcp/asset/6c74bbf2-475e-4799-a099-0380ef29b830";
const imgVector = "https://www.figma.com/api/mcp/asset/d04f494d-bf6a-4643-bad0-1196092b6cdb";
const imgVector1 = "https://www.figma.com/api/mcp/asset/e22ac5b0-7a6a-46bd-a8ce-99a7b828522a";
const imgGroup = "https://www.figma.com/api/mcp/asset/2f9c56ea-2b3b-4095-ab60-1378dd8acf71";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/26837bed-f378-40a8-854d-ccab890659a9";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/50345c3b-513f-4b87-98be-791dbb7c047c";

type NotificationItemProps = {
  avatar: string;
  name: string;
  message: string;
  time: string;
  isRead?: boolean;
};

function NotificationItem({ avatar, name, message, time, isRead = true }: NotificationItemProps) {
  return (
    <div className={`content-stretch flex gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-[327px] ${isRead ? "bg-white border border-[#dfe1e7] border-solid" : "bg-[#feeced]"}`}>
      <div className="overflow-clip relative rounded-[100px] shrink-0 size-[48px]">
        <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={avatar} />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[1.55] relative shrink-0 text-[#0d0d12] text-[14px] tracking-[-0.28px]">{name}</p>
          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[#818898] text-[12px] tracking-[-0.24px]">{time}</p>
        </div>
        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[#818898] text-[12px] tracking-[-0.24px] w-full">{message}</p>
      </div>
    </div>
  );
}

export default function Notifications() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[375px] h-[812px] overflow-hidden">
        <div className="bg-white relative size-full" data-node-id="2043:5067" data-name="23. Notifications">
          <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[24px] top-[132px]">
            <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0">
              <div className="content-stretch flex items-end justify-between relative shrink-0 w-[327px]">
                <div className="flex flex-[1_0_0] flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center min-w-px relative text-[#0d0d12] text-[18px]">
                  <p className="leading-[1.55]">Today</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
                <NotificationItem
                  avatar={imgIntersect}
                  name="Flock Courier"
                  message="Your package FLX283728347 has been picked up and is on its way!"
                  time="2m ago"
                  isRead={false}
                />
                <NotificationItem
                  avatar={imgIntersect1}
                  name="Promo Alert"
                  message="Get 15% off your next shipment! Use code FLX-DAY003 at checkout."
                  time="1h ago"
                />
                <NotificationItem
                  avatar={imgIntersect2}
                  name="Flock Courier"
                  message="Your package FLX289374923 has been delivered successfully."
                  time="3h ago"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0">
              <div className="content-stretch flex items-end justify-between relative shrink-0 w-[327px]">
                <div className="flex flex-[1_0_0] flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center min-w-px relative text-[#0d0d12] text-[18px]">
                  <p className="leading-[1.55]">Yesterday</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
                <NotificationItem
                  avatar={imgIntersect3}
                  name="Flock Courier"
                  message="Your shipment is out for delivery. Estimated arrival: Today by 5 PM."
                  time="1d ago"
                />
                <NotificationItem
                  avatar={imgVariant2}
                  name="Account"
                  message="Welcome to Flock! Your account has been successfully created."
                  time="1d ago"
                />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute content-stretch flex h-[48px] items-center justify-between left-1/2 top-[60px] w-[327px]">
            <div className="flex flex-[1_0_0] flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] min-w-px relative text-[#0d0d12] text-[18px] text-center">
              <p className="leading-[1.4]">Notifications</p>
            </div>
            <div className="absolute border border-[#dfe1e7] border-solid left-0 overflow-clip rounded-[40px] size-[48px] top-0">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[24px] top-1/2">
                <div className="absolute inset-1/4">
                  <div className="absolute inset-[-8.33%]">
                    <img alt="" className="block max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#feeced] content-stretch flex items-center justify-center overflow-clip p-[8px] relative right-0 rounded-[40px] shrink-0 size-[48px]">
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <div className="absolute inset-[12.5%]">
                  <div className="absolute inset-[-5.56%]">
                    <img alt="" className="block max-w-none size-full" src={imgVector1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[44px] items-center justify-between leading-[0] px-[24px] py-[12px] right-[0.02px] top-0 w-[374.978px]">
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center not-italic relative shrink-0 text-[16px] text-left text-[#0d0d12] whitespace-nowrap">
              <p className="leading-[16px]">9:41</p>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <div className="col-1 h-[10px] ml-0 mt-[2.5px] relative row-1 w-[18px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
              </div>
              <div className="col-1 h-[10.965px] ml-[23px] mt-px relative row-1 w-[15.272px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[44px] mt-0 place-items-start relative row-1">
                <div className="col-1 h-[13px] ml-0 mt-0 relative row-1 w-[26.978px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
