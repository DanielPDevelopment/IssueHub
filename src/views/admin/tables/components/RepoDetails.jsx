import RepoGeneralInfo from 'views/admin/default/components/RepoGeneralInfo';
import { MdClose, MdOutlineFullscreenExit, MdOutlineFullscreen } from 'react-icons/md';
import PropTypes from 'prop-types';
import useKeyDown from 'hooks/useKeyDown';

const RepoDetails = ({
  activeIssue, setActiveIssue, fullscreen, setFullscreen, killTabs,
}) => (
  <div>
    <div
      className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70"
      onClick={() => { setActiveIssue(null); killTabs(); }}
      onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setActiveIssue(null), killTabs])}
      role="button"
      tabIndex={0}
      aria-label="See repo details"
    />
    <div className={`fixed inset-0 z-50 flex wrap items-center justify-center module-content scrollbar-hide ${fullscreen ? '' : 'w-11/12 h-4/5'}`}>
      <div className={`shadow-lg border-orange-0/80 border-[0.05px] rounded-lg ${fullscreen ? 'w-11/12 h-4/5' : 'w-11/12 h-4/5'} overflow-scroll bg-gray-light module-content scrollbar-hide`}>
        <div className="absolute top-4 right-14 m-4 p-2 ">
          <div className="flex wrap items-center">
            {fullscreen ? (
              <MdOutlineFullscreenExit className="cursor-pointer text-white-500 text-[30px] text-orange-0 hover:text-orange-0/80 focus:outline-none" onClick={() => setFullscreen((prev) => !prev)} />
            )
              : (<MdOutlineFullscreen className="cursor-pointer text-white-500 text-[30px] text-orange-0 hover:text-orange-0/80 focus:outline-none" onClick={() => setFullscreen((prev) => !prev)} />)}
            <MdClose className="cursor-pointer text-white-500 text-[30px] text-orange-0 hover:text-orange-0/80 focus:outline-none" onClick={() => setActiveIssue(null)} />
          </div>
        </div>
        <RepoGeneralInfo
          issue={activeIssue || {}}
          setActiveIssue={setActiveIssue}
          setFullscreen={setFullscreen}
          fullscreen={fullscreen}
        />
      </div>
    </div>
  </div>
);

RepoDetails.propTypes = {
  activeIssue: PropTypes.node.isRequired,
  setActiveIssue: PropTypes.node.isRequired,
  fullscreen: PropTypes.bool,
  setFullscreen: PropTypes.node.isRequired,
  killTabs: PropTypes.func.isRequired,
};

RepoDetails.defaultProps = {
  fullscreen: true,
};
export default RepoDetails;
