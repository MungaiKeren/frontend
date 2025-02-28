import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import CreateRecipe from './pages/CreateRecipe'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MyRecipes from './pages/MyRecipes'
import { SnackbarProvider } from './components/common/SnackbarProvider'
import EditRecipe from './pages/EditRecipe'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <Router>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  minHeight: '100vh',
                  width: '100%'
                }}
              >
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                    <Route path="/my-recipes" element={<MyRecipes />} />
                    <Route path="/create-recipe" element={<CreateRecipe />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recipes/:id/edit" element={<EditRecipe />} />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
