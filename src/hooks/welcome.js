import Logtastic from '@ofrepose/logtastic';

const helloWorld = () => {
  console.clear();
  console.log(`
    

    ██╗███████╗███████╗██╗   ██╗███████╗██╗  ██╗██╗   ██╗██████╗             
    ██║██╔════╝██╔════╝██║   ██║██╔════╝██║  ██║██║   ██║██╔══██╗            
    ██║███████╗███████╗██║   ██║█████╗  ███████║██║   ██║██████╔╝            
    ██║╚════██║╚════██║██║   ██║██╔══╝  ██╔══██║██║   ██║██╔══██╗            
    ██║███████║███████║╚██████╔╝███████╗██║  ██║╚██████╔╝██████╔╝            
    ██████╗══█████╗═███████╗██╗ ╚██╗██████╗  ██████╗══█████╗═██████╗ ██████╗ 
    ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
    ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
    ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
    ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
                                                                                 
                                                                         

   `);
  Logtastic.log('👋 Welcome to IssueHub - I hope you find this application useful.', { color: 'blue' });
  Logtastic.log('📢 If you have any questions or want to collab on something feel free to reach out to me https://ofrepose.github.io/ - ', { color: 'green' });
};

// eslint-disable-next-line import/prefer-default-export
export { helloWorld };
