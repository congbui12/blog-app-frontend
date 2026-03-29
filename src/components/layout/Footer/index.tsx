// import { GlobeIcon } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   return (
//     <footer className="mt-auto w-full bg-white border-t border-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
//         {/* Brand / Logo Section */}
//         <div className="flex items-center gap-2">
//           <GlobeIcon className="h-6 w-6 text-blue-600" />
//           <span className="font-bold text-xl tracking-tight text-gray-900">Blog This</span>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-gray-500">
//           <Link to="/about" className="hover:text-blue-600 transition-colors">
//             About
//           </Link>
//         </nav>

//         {/* Copyright Section */}
//         <div className="text-sm text-gray-400 font-medium">
//           @ {currentYear} <span className="text-gray-700 font-semibold">Blog This. </span>
//           <span className="hidden sm:inline">All rights reserved.</span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { GlobeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Flex, Text, Container, Section, Box } from '@radix-ui/themes';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Section đóng vai trò là thẻ <footer> với border-t và padding chuẩn
    <Section asChild size="2" py="6" className="mt-auto border-t border-gray-100 bg-white">
      <footer>
        <Container size="4">
          <Flex
            direction={{ initial: 'column', md: 'row' }}
            align="center"
            justify="between"
            gap="5"
          >
            {/* Brand / Logo Section */}
            <Flex align="center" gap="2">
              <GlobeIcon className="h-6 w-6 text-blue-600" />
              <Text weight="bold" size="5" highContrast className="tracking-tight">
                Blog This
              </Text>
            </Flex>

            {/* Navigation Links */}
            <nav>
              <Flex gap="6" wrap="wrap" justify="center">
                <Link
                  to="/about"
                  className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  About
                </Link>
                {/* Bạn có thể thêm các Link khác ở đây, gap sẽ tự xử lý */}
              </Flex>
            </nav>

            {/* Copyright Section */}
            <Box>
              <Text size="2" color="gray" weight="medium">
                © {currentYear}{' '}
                <Text weight="bold" highContrast>
                  Blog This.{' '}
                </Text>
                <Text className="hidden sm:inline">All rights reserved.</Text>
              </Text>
            </Box>
          </Flex>
        </Container>
      </footer>
    </Section>
  );
};

export default Footer;
